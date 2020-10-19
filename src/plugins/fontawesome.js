import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faHouseUser,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHome, faHouseUser, faAngleDoubleLeft, faAngleDoubleRight);

Vue.component("font-awesome-icon", FontAwesomeIcon);
