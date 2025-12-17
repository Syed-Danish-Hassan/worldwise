//import AppNav from "../components/AppNav";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
function AppLayout() {
  return (
    <div className={styles.app}>
      {/* <AppNav />
      <p>AppNav</p> */}
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
