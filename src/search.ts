import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

async function main() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  });

  const indexName = 'prueba'; // Usa el nombre de tu índice ya creado
  const index = pc.index(indexName).namespace("ns1"); // Usa el namespace correcto si aplica

  const query = 'muralla china';

  const results = await index.searchRecords({
    query: {
      topK: 5,
      inputs: { text: query },
    },
  });

  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);