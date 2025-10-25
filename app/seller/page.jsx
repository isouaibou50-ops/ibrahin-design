'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react"; // spinner icon

const AddProduct = () => {
  const { getToken } = useAppContext();


  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men&rsquo;s Collection');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isUploading, setIsUploading] = useState(false); // 🔥 upload state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return; // prevent multiple clicks

    setIsUploading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const token = await getToken();

      const { data } = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("Men&rsquo;s Collection");
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative flex-1 min-h-screen flex flex-col justify-between">
      {/* ✅ Fullscreen overlay while uploading */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
          <p className="text-white text-lg font-medium">Uploading, please wait...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Image Upload */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    if (e.target.files?.[0]) {
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <Image
                  className="max-w-24 cursor-pointer border rounded-md"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        {/* Category and Prices */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Men&rsquo;s Collection">👔 Men&rsquo;s Collection</option>
              <option value="Women&rsquo;s Collection">👗 Women&rsquo;s Collection</option>
              <option value="Unisex / Universal">
                👨🏾‍🤝‍👩🏾 Unisex / Universal
              </option>
              <option value="Lifestyle & Exclusive">
                🌍 Lifestyle & Exclusive
              </option>
              <option value="Cultural & Traditional">
                🪡 Cultural & Traditional
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`flex items-center justify-center gap-2 px-8 py-2.5 rounded font-medium text-white transition ${
            isUploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Uploading...
            </>
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;




// 'use client'
// import React, { useState } from "react";
// import { assets } from "@/assets/assets";
// import Image from "next/image";
// import { useAppContext } from "@/context/AppContext";
// import axios from "axios";
// import toast from "react-hot-toast";

// const AddProduct = () => {

//   const { getToken } = useAppContext();

//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('Earphone');
//   const [price, setPrice] = useState('');
//   const [offerPrice, setOfferPrice] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('category', category);
//     formData.append('price', price);
//     formData.append('offerPrice', offerPrice);

//     for (let i=0; i < files.length; i++) {
//       formData.append('images', files[i])
//     }

//     try {
//       const token = await getToken();

//       const { data } = await axios.post('/api/product/add', formData, { headers: {Authorization: `Bearer ${token}`}});

//       if (data.success) {
//         toast.success(data.message);
//         setFiles([]);
//         setName('');
//         setDescription('');
//         setCategory('Men&rsquo;s Collection');
//         setPrice('');
//         setOfferPrice('');
//       } else {
//         toast.error(data.message)
//       }


//     } catch (error) {
//       toast.error(error.message)
//     }

  

//   };

//   return (
//     <div className="flex-1 min-h-screen flex flex-col justify-between">
//       <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
//         <div>
//           <p className="text-base font-medium">Product Image</p>
//           <div className="flex flex-wrap items-center gap-3 mt-2">

//             {[...Array(4)].map((_, index) => (
//               <label key={index} htmlFor={`image${index}`}>
//                 <input onChange={(e) => {
//                   const updatedFiles = [...files];
//                   updatedFiles[index] = e.target.files[0];
//                   setFiles(updatedFiles);
//                 }} type="file" id={`image${index}`} hidden />
//                 <Image
//                   key={index}
//                   className="max-w-24 cursor-pointer"
//                   src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
//                   alt=""
//                   width={100}
//                   height={100}
//                 />
//               </label>
//             ))}

//           </div>
//         </div>
//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-name">
//             Product Name
//           </label>
//           <input
//             id="product-name"
//             type="text"
//             placeholder="Type here"
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             required
//           />
//         </div>
//         <div className="flex flex-col gap-1 max-w-md">
//           <label
//             className="text-base font-medium"
//             htmlFor="product-description"
//           >
//             Product Description
//           </label>
//           <textarea
//             id="product-description"
//             rows={4}
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
//             placeholder="Type here"
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//             required
//           ></textarea>
//         </div>
//         <div className="flex items-center gap-5 flex-wrap">
//           <div className="flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="category">
//               Category
//             </label>
//             <select
//               id="category"
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//               onChange={(e) => setCategory(e.target.value)}
//               defaultValue={category}
//             >
//               <option value="Men&rsquo;s Collection">👔 Men&rsquo;s Collection</option>
//               <option value="Women&rsquo;s Collection">👗 Women&rsquo;s Collection</option>
//               <option value="Unisex / Universal">👨🏾‍🤝‍👩🏾 Unisex / Universal</option>
//               <option value="Lifestyle & Exclusive">🌍 Lifestyle & Exclusive</option>
//             </select>
//           </div>
//           <div className="flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="product-price">
//               Product Price
//             </label>
//             <input
//               id="product-price"
//               type="number"
//               placeholder="0"
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//               onChange={(e) => setPrice(e.target.value)}
//               value={price}
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="offer-price">
//               Offer Price
//             </label>
//             <input
//               id="offer-price"
//               type="number"
//               placeholder="0"
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//               onChange={(e) => setOfferPrice(e.target.value)}
//               value={offerPrice}
//               required
//             />
//           </div>
//         </div>
//         <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
//           ADD
//         </button>
//       </form>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default AddProduct;