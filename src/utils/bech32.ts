import { AccAddress } from "@terra-money/feather.js"
import { bech32 } from "bech32"

export function getChainIDFromAddress(
  address: any,
  chains: Record<
    string,
    {
      chainID: string
      prefix: string
    }
  >
) {
  if (!AccAddress.validate(address)) return undefined
  const addPrefix = AccAddress.getPrefix(address)
  return Object.values(chains).find(
    ({ prefix }) => prefix === addPrefix || `${prefix}valoper` === addPrefix
  )?.chainID
}

export function addressFromWords(words: string, prefix = "terra") {
  return bech32.encode(prefix, Buffer.from(words, "hex"))
}

export function wordsFromAddress(address: AccAddress) {
  return Buffer.from(bech32.decode(address).words).toString("hex")
}
