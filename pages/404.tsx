import { useRouter } from "next/router";

function PageNotFound() {
  const router = useRouter();

  return (
    <div>
      <p>404 the page you are looking for is not found</p>
      <br />
      <button className="button" onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
}

export default PageNotFound;
