'use client'
import { getDataBaseInfo } from '../Components/Table/Table';
import Table from "@/Components/Table/Table";
import { Montserrat } from "next/font/google";

const montserat = Montserrat(
  {
    wight: ['500', '700'],
    style:'normal',
    subsets: ["latin"]
  });

export default function Home({ users }) {

  return (
    <main className={`flex justify-center items-center ${montserat.className} not-italic leading-normal`}>
      <Table users={users} />
    </main>
  )
 
}
export const getServerSideProps = async () => {
  return getDataBaseInfo()
}

