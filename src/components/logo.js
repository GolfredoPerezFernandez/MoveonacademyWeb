import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
              alt="Move On Academy"
              src="https://bafybeicbl4j7epe2oph7mt5keoilq5zgjw4ehlex74yc6yvdglfiy73fiq.ipfs.nftstorage.link/"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
              }}
            />
   
  );
};
