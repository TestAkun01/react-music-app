export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 xl:px-40 lg:px-28 md:px-20 sm:px-20 px-5">
      <div className="mx-auto grid grid-cols-2 gap-10">
        <div className="w-full  mb-4">
          <h3 className="text-2xl font-bold">React-Music-App</h3>
          <p className="mt-2 text-justify">
            Platform inovatif untuk menikmati streaming music dengan pengalaman
            terbaik, didukung oleh teknologi canggih dari Next.js, desain yang
            elegan dari Tailwind CSS, dan kehandalan MongoDB untuk menyimpan
            data Anda.
          </p>
        </div>
        <div className="w-full mb-4">
          <h3 className="text-2xl font-bold">Lorem, ipsum dolor.</h3>
          <p className="mt-2 text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
            accusantium cupiditate, vel similique nesciunt praesentium
            veritatis! Laboriosam rem eaque quasi!
          </p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p>&copy; 2024 React-Music-App. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
}
