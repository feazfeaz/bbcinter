'use client'

import ProductList from "@/component/ProductList";

import styles from "./page.module.css";

export default function Home() {

  
  return (
    <main className={styles.main}>
      <div>
        <ProductList />
      </div>
    </main>
  );
}
