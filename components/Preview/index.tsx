import Image from 'next/image';

import previewImage from '@/assets/images/preview.png';

const Preview = () => {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md text-center">
      <span className="block text-lg font-semibold mb-4">No Products</span>
      <Image
        width={300}
        height={300}
        src={previewImage}
        alt="product"
        className="mx-auto rounded-lg shadow-md"
      />
    </div>
  );
};

export default Preview;
