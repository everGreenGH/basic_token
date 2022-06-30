![사진출처: [https://hardhat.org/](https://hardhat.org/)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f3495cd-d788-4463-9453-98336bfcecce/Untitled.png)

사진출처: [https://hardhat.org/](https://hardhat.org/)

4주차에는 **Hardhat 개발 환경 도구 구축 방법**을 알아보고, ERC-20 표준을 따르는 MyToken 토큰을 생성하여 **대략적으로 컨트랙트의 배포 과정**에 대하여 살펴볼 것입니다. 4주차에서는 각각의 코드의 의미를 이해하기보다는, MyToken 컨트랙트의 배포라는 간단한 예제를 통하여 컨트랙트 배포의 전반적인 흐름을 이해하는 것을 목표로 합니다. 각각의 흐름들에 대해서는 5주차, 6주차에 좀 더 자세하게 다룰 것입니다.

**HardHat은 Ethereum 기반 스마트컨트랙트 개발을 편리하게 해 줄 수 있는 개발 환경 도구**입니다. HardHat은 로컬 개발 환경에서 컴파일, 배포, 테스트 등 다양한 기능을 지원합니다. HardHat은 기존에 다수를 차지하던 도구인 Truffle에 비하여 verify, testing, console.log 등 여러 기능적인 이점을 제공하기 때문에, 다수의 프로젝트들이 HardHat을 이용하고 있습니다.

### HardHat 기본 설정

HardHat은 아래 명령어를 터미널에 입력하여 설치할 수 있습니다.

```
npm init -y
npm i hardhat --dev
```

Basic Sample Project를 생성하세요.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4346642f-c570-4ef5-bbfe-e5b47c895534/Untitled.png)

오픈제플린 라이브러리도 설치해주세요.

```
npm i @openzeppelin/contracts --dev
```

테스트 라이브러리 및 Ethers.js 라이브러리도 설치합니다.

```
npm i @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers --dev
```

### 컨트랙트 작성

하드햇 개발환경 테스트를 위하여 아주 단순한 ERC-20 기준을 따르는 토큰 컨트랙트를 작성하고, 테스트넷에 배포하여 메타마스크에서 토큰을 확인해 보겠습니다. 우선 MyToken.sol을 생성하여, ERC-20 기준 토큰 컨트랙트를 작성합니다.

```solidity
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
  uint public INITIAL_SUPPLY = 10000000000000000000000000000;
  constructor() public ERC20("New Penguin Token", "PNT") {
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}
```

우선 node_modulus/@openzeppelin/contracts에 구현되어 있는 ERC20.sol 파일을 import하고, ERC20.sol 컨트랙트를 상속하는 MyToken 컨트랙트를 작성합니다. 최초 컨트랙트 배포 시 내가 해당 토큰을 받을 수 있도록 생성자에 _mint 함수를 통하여 INITIAL_SUPPLY만큼 받도록 작성합니다.

### hardhat.config.js 작성

hardhat.config.js를 작성하는 것은 하드햇 환경설정을 직접 작성하는 것입니다. hardhat.config.js에서는 Solidity 버전, 네트워크 등과 같은 배포와 관련된 설정을 직접 설정할 수 있습니다.

```jsx
const { alchemyApiKey, etherscanApiKey, privateKey } = require('./secrets.json');

require("@nomiclabs/hardhat-waffle");
// require('@nomiclabs/hardhat-etherscan');
 
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
}); 
 
module.exports = {
  solidity: {
    version: "0.8.4",
  }, 
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      chainId: 4, 
      accounts: [privateKey]
    },
  }
};
```

우선 solidity 버전을 컨트랙트와 동일하게 설정합니다. 그리고 컨트랙트를 배포할 네트워크를 설정해야 하는데, 이 예제에서는 **Rinkeby 테스트 네트워크**를 사용하였습니다. (Goerli 테스트넷을 사용해도 무관) 테스트넷을 사용하기 위해서는 테스트넷 블록체인에 컨트랙트를 배포해 줄 이더리움 노드 세팅을 해 주어야 하는데, **Infura나 Alchemy와 같이 이더리움 노드를 대신 운영해 주는 서비스**의 도움을 받을 수 있습니다. 이 예제에서는 Alchemy를 이용하였습니다.

**Alchemy 링크:**

<aside>
📎 [https://www.alchemy.com/](https://www.alchemy.com/)

</aside>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1c377917-180b-4c97-b8c2-ecaec7b62eb2/Untitled.png)

로그인 시 위의 화면을 볼 수 있습니다. “+ create app” 버튼을 눌러서 이름과 설명을 작성한 후, Chain을 Ethereum으로 설정하고, Network를 본인이 설정한 테스트넷으로 설정합니다.

```jsx
const { alchemyApiKey, etherscanApiKey, privateKey } = require('./secrets.json');

module.exports = {
  solidity: {
    version: "0.8.4",
  }, 
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      chainId: 4, 
      accounts: [privateKey]
    },
  }
};
```

이제 module.exports 부를 작성할 수 있습니다. 이때, Alchemy의 ApiKey나 Metamask의 개인키와 같은 개인 정보를 공개된 코드에 작성하는 것은 위험하기 때문에, **secrets.json 파일을 작성한 후 해당 파일에 ApiKey와 개잍키를 작성한 후, 해당 파일을 import하여 사용하는 것이 안전합니다.** (secrets.json파일은 .gitignore에 추가하여 커밋 시 업로드되지 않도록 설정해 주세요.)

### MyToken.deploy.js 작성 및 컨트랙트 배포

```jsx
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const MyTokenContract = await hre.ethers.getContractFactory("MyToken");
  const myTokenContract = await MyTokenContract.deploy();

  await myTokenContract.deployed();

  console.log("Your deployed contract address:", myTokenContract.address);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

MyToken.deploy.js 파일은 MyToken.sol 컨트랙트를 배포하는 기능을 수행합니다. HardHat에서 기본으로 제공하는 코드에, 배포 시 배포자의 컨트랙트 주소와 잔고를 출력하는 기능을 추가하였습니다.

이제 컨트랙트를 배포할 수 있습니다. 배포하기 전에 Rinkeby 계정에 이더가 남아있는지 확인하자. 이더가 남아있지 않으면 Gas Fee를 지불할 수 없기 때문에, 컨트랙트를 배포할 수 없습니다. 이더가 없다면 Faucet에서 이더를 받을 수 있습니다.

**Rinkeby Faucet 링크:**

<aside>
📎 [https://rinkebyfaucet.com/](https://rinkebyfaucet.com/)

</aside>

```
npx hardhat compile
npx hardhat run --network <네트워크이름> scripts/MyToken.deploy.js
```

![배포 예시](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f432565d-ce86-4db4-acbc-accb9328c7bc/Untitled.png)

배포 예시

배포 시 위에서 설정한 console.log 양식에 맞추어 정보를 출력합니다. Alchemy에 접속하여 배포가 잘 이루어졌는지 확인합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de5febce-30b8-46d5-a52b-797d69012854/Untitled.png)

이와 같이 트랜잭션에 대한 정보를 확인할 수 있습니다. Contract Address 옆에 있는 컨트랙트 주소를 클릭하여, Etherscan에서 컨트랙트에 대한 정보를 볼 수 있습니다.

**예시 컨트랙트 정보:**

<aside>
📎 [https://rinkeby.etherscan.io/address/0x858b8bb80ee744bfdf9918e63b4566c1d452a1b1](https://rinkeby.etherscan.io/address/0x858b8bb80ee744bfdf9918e63b4566c1d452a1b1)

</aside>

Token Tracker는 ERC-20 기준을 준수하는 토큰에 대한 정보를 제공합니다. New Penguin Token, PNT가 잘 배포되었음을 확인할 수 있습니다.

### Metamask에서 토큰 확인하기

![토큰 가져오기 클릭](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7cfa3280-f87e-4568-a8a5-686cfee14eef/Untitled.png)

토큰 가져오기 클릭

![토큰 정보 작성](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed11d2f0-9750-46e1-9cbc-e032900110b1/Untitled.png)

토큰 정보 작성

Metamask에서 가장 아래쪽의 토큰 가져오기를 클릭하면, 직접 토큰 정보를 불러올 수 있습니다. 앞서 배포한 컨트랙트 주소를 토큰 계약 주소에 작성하면, 아래 정보들은 자동으로 채워집니다. 맞춤형 토큰 추가 버튼을 클릭하여, 위에서 만든 토큰에 대한 정보를 Metamask에서 불러올 수 있습니다.
