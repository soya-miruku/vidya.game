import { useCallback } from "react";
import { useEthers } from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const useAccount = (connectorName: string) => {
  const {active, isLoading: isAuthenticating, error: authError, activate, activateBrowserWallet: authenticate, deactivate: logout, account: user} = useEthers();

  const Connect = useCallback(async () => {
    try { 
      if(connectorName === 'walletConnect') {
        const provider =new WalletConnectProvider({
          infuraId: process.env.infuraId
        });
        await provider.enable();
        await activate(provider);
      }
      else {
        authenticate();
      }
    } catch (error) {
      console.log(error);
    }
  }, [authenticate, connectorName]);

  const Disconnect = useCallback(() => {
    logout();
    if(connectorName === 'walletConnect') {
      localStorage.removeItem('walletconnect');
    }
  }, [logout]);

  return { isAuthenticated: active && user, isAuthenticating, authError, user, Connect, Disconnect, isInitialized:true, initialize: () => {}};
}