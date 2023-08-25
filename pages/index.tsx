import { ConnectWallet, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from "react";
import { BigNumber } from "ethers";

export default function Home() {
  const { contract } = useContract(
    "0x4aFd677127a324F4d760499c8a7822a445905dF0"
  );

  // const { data } = useContractRead(contract, "tokenURI", [1]);

  // console.log(data);

  // let tokenId: number = 1;
  // let value: number = 0;
  const [tokenSlot, setTokenSlot] = useState<number>();
  const [tokenId, setTokenId] = useState<number>();
  const [tokenList, setTokenList] = useState<any []>();
  const [mintValue, setMintValue] = useState<number>();
  const [mintAddress, setMintAddress] = useState<string>();
  const [tokenURI, setTokenURI] = useState<string>("");
  const [transferAddress, setTransferAddress] = useState<string>();

  // 検索機能の実装
  const searchTokenURI = () => {
    contract?.call("exists", [tokenId]).then(
      async bool => {
        if (await bool) {
          console.log(bool)
          contract?.call("tokenURI", [tokenId]).then(async data => setTokenURI(await data))
        }
        else {
          setTokenURI("トークンが存在しません")
        }
      }
    )
  }

  // トークンリストの実装 バグ有
  const [max, setMax] = useState<number>(0);
  const listToken = () => {
    contract?.call("balanceOf", ["0x1d1f4882Da564c04e310eBABA6836ac33517E60a"]).then(async data => (setMax((await data).toNumber()), console.log(data), console.log((await data).toNumber())));
    let i = 0;
    let tokenListTmp: any[] = [];
    for (i = 0; i < max; i++) {
      contract?.call("tokenOfOwnerByIndex", ["0x1d1f4882Da564c04e310eBABA6836ac33517E60a", i]).then(async data => tokenListTmp.push(await data))
    }
    setTokenList(tokenListTmp);
    console.log(max);
    console.log(i);
    console.log(tokenListTmp);
    console.log(tokenList);
  }

  return <main className={styles.main}>

    {/* まず都道府県IDを指定 */}
    <div>
      【共通】※まず要入力
      <p>
        都道府県Slot (1-47)
        <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setTokenSlot(Number(e.target.value)))} />
      </p>
    </div>

    {/* register */}
    <div>
      <p>
        【事業者登録】
      </p>
      <Web3Button
      contractAddress="0x4aFd677127a324F4d760499c8a7822a445905dF0"
      action={()=> contract?.call("register", [])}
      >
      登録
    </Web3Button>
    </div>

    {/* mint */}

    <div>
      【発行】
      <p>
        希望発行単位
        <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setMintValue(Number(e.target.value)))} />
      </p>
      <p>
        宛先
        <input type="string" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setMintAddress(e.target.value))} />
      </p>
      {/* <p>
        <button onClick={() => contract?.call("mint", ["0x1d1f4882Da564c04e310eBABA6836ac33517E60a", 1, mintValue]).then(data => console.log(data))}> 発行 </button>
      </p> */}
      <Web3Button
      contractAddress="0x4aFd677127a324F4d760499c8a7822a445905dF0"
      action={()=> contract?.call("mint", [mintAddress, tokenSlot, mintValue])}
      >
      トークンを発行
    </Web3Button>
    </div>

    {/* tokenList */}
    <div>
    【トークンリスト】※バグ有
      <p>
        <button onClick={listToken}> トークンリスト </button>
      </p>
      <p></p>
      { tokenList }
    </div>

    {/* tokenURI */}

    <div>
      【検索】
      <p>
        ID
        <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setTokenId(Number(e.target.value)))} />
      </p>
      <p>
        <button onClick={searchTokenURI}> tokenURIを検索 </button>
      </p>
      <p></p>
      <div dangerouslySetInnerHTML={{ __html:tokenURI }} />
    </div>

    {/* transfer */}

    <div>
      【支払】
      {/* <p>
        支払金額
        <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setTransferValue(Number(e.target.value)))} />
      </p> */}
      <p>
        支払先アドレス
        <input type="string" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setTransferAddress(e.target.value))} />
      </p>
      <Web3Button
      contractAddress="0x4aFd677127a324F4d760499c8a7822a445905dF0"
      action={()=> contract?.call("transfer", ["0x1d1f4882Da564c04e310eBABA6836ac33517E60a", transferAddress, tokenId])} // TODO: fromはmetamaskから取る
      >
      検索したIDのトークンを支払
    </Web3Button>
    </div>

  </main>;
}
