import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute px-[80px] w-[100%] bg-transparent py-6 bottom-0">
        <hr className="mb-4 border-t-2 border-[#111827]" />
      <div className="mx-auto flex flex-col md:flex-row font-semibold text-[16px] items-center justify-between text-sm text-black">
        <p>@2025 AetherAI, Inc.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/privacy" className="hover:text-black">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-black">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
