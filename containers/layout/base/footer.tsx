import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className=" border px-3 mb-4 rounded-xl">
          <div className="flex justify-between text-smp py-5">
            <p>طراحی و توسعه توسط حمید شاهسونی</p>
            <Image
              src="/images/layout/logo.svg"
              alt="logo"
              width={140}
              height={140}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
