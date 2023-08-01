import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


export const client = createClient({
    projectId: "ozs9dlww",
    dataset: 'production',
    token:"skCpf5vtdX0HEbhJTkNNyorNJkvcY9N6dQ6jsudUigNFyvmpMchigcUVndaStJpC73QF2X9Ozb7B1YRk0mcCHLdZWaPLcLoPsMXPUr6d16asG4gX441ZDV50jRdbCGCyBo1JOaVTOnOHWE6j4173BIsNWj3NBduKpjEqFvR5r4nLokgKiclr",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  })

  const builder = imageUrlBuilder(client)

export const urlFor = (source)=>builder.image(source);

// export default client