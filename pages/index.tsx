import { ConnectWallet, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from "react";
import { BigNumber } from "ethers";
import { test } from "node:test";

export default function Home() {
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "ApprovalValue",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "metadataDescriptor",
          "type": "address"
        }
      ],
      "name": "SetMetadataDescriptor",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_oldSlot",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_newSlot",
          "type": "uint256"
        }
      ],
      "name": "SlotChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_fromTokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_toTokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "TransferValue",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "addressToId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "operator_",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value_",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "exists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exists_",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSupportedRequests",
      "outputs": [
        {
          "internalType": "uint64[]",
          "name": "arr",
          "type": "uint64[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "requestId",
          "type": "uint64"
        }
      ],
      "name": "getZKPRequest",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "schema",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "claimPathKey",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "operator",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "value",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256",
              "name": "queryHash",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "circuitId",
              "type": "string"
            }
          ],
          "internalType": "struct ICircuitValidator.CircuitQuery",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "idToAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator_",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "metadataDescriptor",
      "outputs": [
        {
          "internalType": "contract IERC3525MetadataDescriptor",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "slot_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount_",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ownerAddr",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "name": "proofs",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "slot_",
          "type": "uint256"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "name": "requestQueries",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "schema",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "claimPathKey",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "operator",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "queryHash",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "circuitId",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "name": "requestValidators",
      "outputs": [
        {
          "internalType": "contract ICircuitValidator",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data_",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator_",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved_",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "requestId",
          "type": "uint64"
        },
        {
          "internalType": "contract ICircuitValidator",
          "name": "validator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "schema",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "claimPathKey",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "operator",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "value",
          "type": "uint256[]"
        }
      ],
      "name": "setZKPRequest",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "requestId",
          "type": "uint64"
        },
        {
          "internalType": "contract ICircuitValidator",
          "name": "validator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "schema",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "claimPathKey",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "operator",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "value",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "queryHash",
          "type": "uint256"
        }
      ],
      "name": "setZKPRequestRaw",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "slotOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "slot_",
          "type": "uint256"
        }
      ],
      "name": "slotURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "requestId",
          "type": "uint64"
        },
        {
          "internalType": "uint256[]",
          "name": "inputs",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[2]",
          "name": "a",
          "type": "uint256[2]"
        },
        {
          "internalType": "uint256[2][2]",
          "name": "b",
          "type": "uint256[2][2]"
        },
        {
          "internalType": "uint256[2]",
          "name": "c",
          "type": "uint256[2]"
        }
      ],
      "name": "submitZKPResponse",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index_",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index_",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fromTokenId_",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value_",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "newTokenId",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fromTokenId_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "toTokenId_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value_",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "valueDecimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "slot_",
          "type": "uint256"
        }
      ],
      "name": "verifyBackdoor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // thirdwebのdashboardにimportできない場合,ipfsにabiが保存されないため,ここに直接記述. erc3525-getting-started/artifacts/contracts/ERC3525GettingStarted.sol/ERC3525GettingStarted.jsonを参照
  const { contract } = useContract(
    "0xA2375aD738cd14f45b16bd09705f10D9ac901630",
    contractAbi
  );
  const [tokenSlot, setTokenSlot] = useState<number>(1);
  const [tokenId, setTokenId] = useState<number>();
  const [tokenList, setTokenList] = useState<any>();
  const [mintValue, setMintValue] = useState<number>(500);
  const [mintAddress, setMintAddress] = useState<string>();
  const [tokenURI, setTokenURI] = useState<string>("");
  const [transferAddress, setTransferAddress] = useState<string>();
  const [role, setRole] = useState<number>(9); // 0: 管理者, 1: 事業者, 2: ユーザー, 9: 未選択

  /*
  useState周りのハマりどころ
  https://qiita.com/shunexe/items/5d88e255f18280d6941d
  */

  // 検索機能の実装
  const searchTokenURI = () => {
    contract?.call("exists", [tokenId]).then(
      async bool => {
        if (await bool) {
          contract?.call("tokenURI", [tokenId]).then(async data => setTokenURI(await data))
        }
        else {
          setTokenURI("トークンが存在しません")
        }
      }
    )
  }

  // トークンリストの実装 バグ有
  let max = 0;
  let tokenListTmp = [9];
  const listToken = () => {
    contract?.call("balanceOf", ["0x1d1f4882Da564c04e310eBABA6836ac33517E60a"]).then(async data => ((max = (await data).toNumber()), console.log((await data).toNumber())));
    let i = 0;
    tokenListTmp = [9];
    for (i = 0; i < max; i++) {
      contract?.call("tokenOfOwnerByIndex", ["0x1d1f4882Da564c04e310eBABA6836ac33517E60a", i]).then(async data => (tokenListTmp.push((await data).toNumber()), console.log(await data)));
    }
    tokenListTmp.map(item => <li>{item}</li>);
    tokenListTmp.map(item => console.log(item));

    // push まわりここが参考になるかも https://tyotto-good.com/react/usestate-pitfalls

    // const testarray2 = [1];
    // testarray2.push(2);
    // testarray2.push(3);
    // for (i = 4; i < 10; i++) {
    //   testarray2.push(i);
    // }
    // testarray2.map(item => console.log(item));

    // setTokenList(tokenListTmp);
    console.log(max);
    console.log(i);
    console.log(tokenListTmp);
    console.log(tokenListTmp.length);
    tokenListTmp.map(item => console.log(item));
    console.log(tokenList);
  }

  const register =
    <>
      {/* register */}
      <div>
        <p>
          【事業者登録】
        </p>
        <Web3Button
          contractAddress="0xA2375aD738cd14f45b16bd09705f10D9ac901630"
          contractAbi={contractAbi}
          action={() => contract?.call("register", [tokenSlot])}
        >
          登録
        </Web3Button>
      </div>
    </>

  const verifyBackdoor =
    <>
    <div>
    <p>
      【認証バックドア】
    </p>
    <Web3Button
      contractAddress="0xA2375aD738cd14f45b16bd09705f10D9ac901630"
      contractAbi={contractAbi}
      action={() => contract?.call("verifyBackdoor", [tokenSlot])}
    >
      認証
    </Web3Button>
    </div>
    </>

  const Img = () => {
    switch (tokenSlot) {
      case 1:
        return <img src="/images/submitResponse1.png" alt="submitResponse" />;
      case 2:
        return <img src="/images/submitResponse2.png" alt="submitResponse" />;
      case 3:
        return <img src="/images/submitResponse3.png" alt="submitResponse" />;
      default:
        return (
          <p>
          この区では発行していません
          </p>
        )
    }
  }

  const submitResponse =
    <>
      {/* submitResponse */}
      <div>
        <p>
          【認証】
          このQRコードをPolygon ID appで読み取ることで500円分のトークンを受け取れます
        </p>
        <Img />
      </div>
    </>

  const mint =
    <>
      {/* mint */}
      <div>
        【発行】認証済のユーザに対してのみ追加発行可能
        <p>
          発行単位
          <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setMintValue(Number(e.target.value)), console.log(mintValue))} />
        </p>
        <p>
          宛先
          <input type="string" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setMintAddress(e.target.value))} />
        </p>
        <Web3Button
          contractAddress="0xA2375aD738cd14f45b16bd09705f10D9ac901630"
          contractAbi={contractAbi}
          action={() => contract?.call("mint", [mintAddress, tokenSlot, mintValue])}
        >
          トークンを発行
        </Web3Button>
      </div>
    </>
  const list =
    <>
      {/* tokenList */}
      <div>
        【トークンリスト】※バグ有
        {/* <p>
          <button onClick={listToken}> トークンリスト </button>
        </p>
        <p></p>
        <ol>
          {tokenList?.map(item => <li>{item}</li>)}
          {tokenList?.map(item => { console.log(item) })}
          {console.log(tokenList)}
        </ol> */}
      </div>
    </>

  const transfer =
    <>
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
        <div dangerouslySetInnerHTML={{ __html: tokenURI }} />
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
          contractAddress="0xA2375aD738cd14f45b16bd09705f10D9ac901630"
          contractAbi={contractAbi}
          action={() => contract?.call("transfer", [transferAddress, tokenId])}>
          検索したIDのトークンを支払
        </Web3Button>
      </div >
    </>

  const common =
    <>
      {/* Select role */}
      <p>役割を選択<br />
        <input type="radio" name="role" value="2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(Number(e.target.value))} />ユーザー
        <input type="radio" name="role" value="1" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(Number(e.target.value))} />事業者
        <input type="radio" name="role" value="0" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(Number(e.target.value))} />管理者
      </p>
      {/* まず23区slotを指定 */}
      <div>
        【共通】
        <p>
          23区を選択 ★:発行中
          <select name="23区" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (setTokenSlot(Number(e.target.value)))}>
            <option value="1">★千代田区</option>
            <option value="2">★中央区</option>
            <option value="3">★港区</option>
            <option value="4">新宿区</option>
            <option value="5">文京区</option>
            <option value="6">台東区</option>
            <option value="7">墨田区</option>
            <option value="8">江東区</option>
            <option value="9">品川区</option>
            <option value="10">目黒区</option>
            <option value="11">大田区</option>
            <option value="12">世田谷区</option>
            <option value="13">渋谷区</option>
            <option value="14">中野区</option>
            <option value="15">杉並区</option>
            <option value="16">豊島区</option>
            <option value="17">北区</option>
            <option value="18">荒川区</option>
            <option value="19">板橋区</option>
            <option value="20">練馬区</option>
            <option value="21">足立区</option>
            <option value="22">葛飾区</option>
            <option value="23">江戸川区</option>
          </select>
        </p>
      </div>
    </>

  switch (role) {
    case 0: // 管理者
      return (
        <>
          <main className={styles.main}>
            {common}
            {mint}
            {verifyBackdoor}
          </main>
        </>
      )
    case 1: // 事業者
      return (
        <>
          <main className={styles.main}>
            {common}
            {register}
          </main>
        </>
      )
    case 2: // ユーザー
      return (
        <>
          <main className={styles.main}>
            {common}
            {submitResponse}
            {transfer}
          </main>
        </>
      )
    default:
      console.log("役割を選択してください");
      return (
        <>
          <main className={styles.main}>
            {common}
          </main>
        </>
      )
  }
}
