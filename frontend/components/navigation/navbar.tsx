import { ConnectButton } from "@rainbow-me/rainbowkit";
import { type ReactElement } from "react";
import styles from "../../styles/Navbar.module.css";
export default function Navbar(): ReactElement {
  return (
    <nav className={styles.navbar}>
      <a
        href="https://alchemy.com/?a=create-web3-dapp"
        target={"_blank"}
        rel="noreferrer"
      >
        <img className={styles.alchemy_logo} src="/alchemy_logo.svg" />
      </a>
      <ConnectButton />
    </nav>
  );
}
