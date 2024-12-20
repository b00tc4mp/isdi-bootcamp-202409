import {redirect} from "next/navigation";

export default () => {
  delete localStorage.token;
  delete localStorage.favorites;
  redirect("/");
}
