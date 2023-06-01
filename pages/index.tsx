import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <div className="nav-links">
        <Link href="/movies">Movies</Link>
        <Link href="/ssr">SuperHeroes</Link>
      </div>
    </div>
  );
}
