import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
              alt="Move On Academy"
              src="https://bafkreietgo6cgjuk7tymttexcap5h6tmfjuybzlfo7uqlkehwwvamkyvxq.ipfs.nftstorage.link/"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
              }}
            />
   
  );
};
