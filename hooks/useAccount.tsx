import { useCallback, useContext } from "react";
import { useEthers } from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserContext } from "@/common/providers/UserProvider";

export const useAccount = () => {
  const { connectorName } = useContext(UserContext);
  
  const { library, active, isLoading: isAuthenticating, error: authError, activate, activateBrowserWallet: authenticate, deactivate: logout, account: user, chainId} = useEthers();

  const Connect = useCallback(async () => {
    try { 
      if(connectorName === 'walletConnect') {
        const provider = new WalletConnectProvider({
          infuraId: process.env.infuraId
        });
        await provider.enable();
        await activate(provider);
      }
      else {
        authenticate();
      }
    } catch (error) {
      console.error(error);
    }
  }, [authenticate, connectorName]);

  const Disconnect = useCallback(() => {
    logout();
    if(connectorName === 'walletConnect') {
      localStorage.removeItem('walletconnect');
    }
  }, [logout]);
  return { library, isAuthenticated: active && user, isAuthenticating, authError, user, Connect, Disconnect, isInitialized:true, initialize: () => {}, chainId: chainId || 1};
}