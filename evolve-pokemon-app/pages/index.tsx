import { ConnectWallet, ThirdwebNftMedia, Web3Button, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { contract } = useContract("0x2Bf5601C0dBe31ecfEA401e568074fa1151ED7CD");
  const address = useAddress();

  const { data: nfts } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.container}>
      <div className={styles.connect}>
        <ConnectWallet />
        <hr />
        {nfts?.map((nft) => (
          <div key={nft.metadata.id.toString()}>
            <ThirdwebNftMedia metadata={nft.metadata} />
            {nft.metadata.name}
          </div>
        ))}
        <hr />
        <Web3Button contractAddress={"0x2Bf5601C0dBe31ecfEA401e568074fa1151ED7CD"} action={(contract) => contract.erc1155.claim(0,1)}>Claim a Squirtle</Web3Button>
        <hr />
        <Web3Button contractAddress={"0x2Bf5601C0dBe31ecfEA401e568074fa1151ED7CD"} action={(contract) => contract.call("evolve")}>Evolve</Web3Button>
      </div>
    </div>
  );
};

export default Home;
