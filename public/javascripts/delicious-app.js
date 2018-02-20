import "../sass/style.scss";
import axios from "axios";
import { $, $$ } from "./modules/bling";
import fontAwesome from "./modules/fontawesome-all";
import autocomplete from "./modules/autocomplete";
import popupMenu from "./modules/mobileMenu";
import addDocuments from "./modules/addDocuments";

// Fon awesome icons

fontAwesome();
addDocuments($("#school-input"), $("#program-input"), $("#course-input"));
popupMenu();
autocomplete($("#address"), $("#lat"), $("#lng"));
