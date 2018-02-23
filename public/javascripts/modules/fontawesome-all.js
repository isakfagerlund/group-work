import fontawesome from "@fortawesome/fontawesome";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";
import faLock from "@fortawesome/fontawesome-free-solid/faLock";
import faGraduationCap from "@fortawesome/fontawesome-free-solid/faGraduationCap";
import faFolder from "@fortawesome/fontawesome-free-solid/faFolder";
import faFilePdf from "@fortawesome/fontawesome-free-solid/faFilePdf";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faCaretRight from "@fortawesome/fontawesome-free-solid/faCaretRight";
import faFileAlt from "@fortawesome/fontawesome-free-solid/faFileAlt";
import faTimesCircle from "@fortawesome/fontawesome-free-solid/faTimesCircle";

function fontAwesome() {
  fontawesome.library.add(
    faUser,
    faEnvelope,
    faLock,
    faGraduationCap,
    faFolder,
    faFilePdf,
    faBars,
    faCaretRight,
    faFileAlt,
    faTimesCircle
  );
}

export default fontAwesome;
