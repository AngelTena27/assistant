import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

async function main() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  });

  const indexName = 'prueba';
  await pc.createIndexForModel({
    name: indexName,
    cloud: 'aws',
    region: 'us-east-1',
    embed: {
      model: 'llama-text-embed-v2',
      fieldMap: { text: 'chunk_text' },
    },
    waitUntilReady: true,
  });

  const records = [
    { "_id": "rec1", "chunk_text": "La Torre Eiffel fue terminada en 1889 y se encuentra en París, Francia.", "category": "historia" },
    { "_id": "rec2", "chunk_text": "La fotosíntesis permite a las plantas convertir la luz solar en energía.", "category": "ciencia" },
    { "_id": "rec3", "chunk_text": "Albert Einstein desarrolló la teoría de la relatividad.", "category": "ciencia" },
    { "_id": "rec4", "chunk_text": "La mitocondria es conocida como la central de energía de la célula.", "category": "biología" },
    { "_id": "rec5", "chunk_text": "Shakespeare escribió muchas obras famosas, incluyendo Hamlet y Macbeth.", "category": "literatura" },
    { "_id": "rec6", "chunk_text": "El agua hierve a 100 °C bajo presión atmosférica estándar.", "category": "física" },
    { "_id": "rec7", "chunk_text": "La Gran Muralla China fue construida para protegerse de las invasiones.", "category": "historia" },
    { "_id": "rec8", "chunk_text": "La miel nunca se echa a perder debido a su bajo contenido de humedad y acidez.", "category": "ciencia de los alimentos" },
    { "_id": "rec9", "chunk_text": "La velocidad de la luz en el vacío es aproximadamente 299,792 km/s.", "category": "física" },
    { "_id": "rec10", "chunk_text": "Las leyes de Newton describen el movimiento de los objetos.", "category": "física" }
  ]


  const index = pc.index(indexName).namespace("ns1");

  await index.upsertRecords(records);

  const stats = await index.describeIndexStats();

  console.log(stats);


}

main().catch(console.error);

