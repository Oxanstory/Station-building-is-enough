import { useInterchainAddresses } from "auth/hooks/useAddress"
import AddressBox from "components/form/AddressBox"
import { useNetwork } from "data/wallet"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import styles from "./ReceivePage.module.scss"

const ReceivePage = () => {
  const network = useNetwork()
  const addresses = useInterchainAddresses()
  // sort Terra first
  const list = Object.values(network).sort((a, b) => {
    if (a.name === "Terra") return -1
    if (b.name === "Terra") return 1
    return 0
  })
  const { t } = useTranslation()
  const [chain, setChain] = useState<string>("")

  useEffect(() => {
    if (list.length > 0) {
      setChain(list[0].chainID)
    }
    // eslint-disable-next-line
  }, [network])

  // TODO: handle wallet not connected
  return (
    <section className={styles.receive}>
      <h1>{t("Receive")}</h1>
      <p>Chain</p>
      <div className={styles.chain__selector}>
        {list.map((c) => (
          <button
            className={c.chainID === chain ? styles.active : ""}
            key={c.chainID}
            onClick={() => setChain(c.chainID)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p>Address</p>
      <AddressBox address={addresses?.[chain] ?? "Connect wallet first"} />
    </section>
  )
}

export default ReceivePage