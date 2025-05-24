import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/matches">Master/Detail</Link>
      <Link href="/players">Sifranik</Link>
    </div>
  );
}
