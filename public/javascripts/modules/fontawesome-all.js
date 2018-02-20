import fontawesome from "@fortawesome/fontawesome";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";
import faLock from "@fortawesome/fontawesome-free-solid/faLock";
import faGraduationCap from "@fortawesome/fontawesome-free-solid/faGraduationCap";
import faFolder from "@fortawesome/fontawesome-free-solid/faFolder";
import faFilePdf from "@fortawesome/fontawesome-free-solid/faFilePdf";

function fontAwesome() {
  fontawesome.library.add(
    faUser,
    faEnvelope,
    faLock,
    faGraduationCap,
    faFolder,
    faFilePdf
  );
}

export default fontAwesome;
