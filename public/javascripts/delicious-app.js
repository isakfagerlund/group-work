import "../sass/style.scss";

import { $, $$ } from "./modules/bling";
import autocomplete from "./modules/autocomplete";
import popupMenu from "./modules/mobileMenu";

popupMenu();
autocomplete($("#address"), $("#lat"), $("#lng"));
