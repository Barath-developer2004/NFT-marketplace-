export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'getName' : IDL.Func([], [IDL.Text], ['query']),
    'getTotalSupply' : IDL.Func([], [IDL.Nat], ['query']),
  });
}; 