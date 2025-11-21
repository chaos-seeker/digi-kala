import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="container border-t">
        <div className="flex justify-between text-smp py-4">
          <p>طراحی و توسعه توسط حمید شاهسونی</p>
          <Image src="/images/layout/logo.svg" alt="logo" width={140} height={140} />
        </div>
      </div>
    </footer>
  );
}
