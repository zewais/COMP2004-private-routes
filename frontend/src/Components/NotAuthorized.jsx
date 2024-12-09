import { Link } from "react-router-dom";
export default function NotAuthorized() {
  return (
    <div>
      <h1>Not Authorized</h1>
      <h1>
        Please <Link to={"/login"}>login</Link> to view this page
      </h1>
    </div>
  );
}
