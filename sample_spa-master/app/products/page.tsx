import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

  const Products = async ({}) => { 
  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Products: 
      </h1>

      <div className="grid place-items-center">
        <h1>produto 1</h1>
      </div>
    </main>
  );
};

export default Products;