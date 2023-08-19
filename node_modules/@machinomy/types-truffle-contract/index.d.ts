declare module 'truffle-contract' {
    import { ABIDefinition } from 'web3/eth/abi'
    import { Tx } from 'web3/eth/types'
    import { TransactionReceipt } from 'web3/types'
    import { Provider } from 'web3/providers'

    namespace contract {
        export interface DeployedContract {
            address: string
            transactionHash: string,
            allEvents: any
        }

        export type HexString = string

        export interface TruffleContract<A> {
            'new' (...args: any[]): Promise<A & DeployedContract> // No Enforcement
            at (address: string): Promise<A & DeployedContract>
            deployed (): Promise<A & DeployedContract>

            defaults (params: Tx): void
            setProvider (provider: Provider): void
            setNetwork (networkId: string | number): void
            resetAddress (): void

            link <B>(instance: TruffleContract<B>): void
            link (name: string, address: string): void

            hasNetwork (networkId: string | number): boolean
            isDeployed (): boolean

            abi: Array<ABIDefinition>
            bytecode: HexString
        }

        export interface TransactionEvent<A> {
            event: string
            args: A
        }

        export interface TransactionResult {
            tx: string
            logs: Array<TransactionEvent<any>>
            receipt: TransactionReceipt
        }
    }

    function contract <A>(json: any): contract.TruffleContract<A>
    export = contract
}
