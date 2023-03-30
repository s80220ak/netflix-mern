import {
  Menu,
  MenuItem,
  Button,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/features/languageSlice";
import i18n from "i18next";

const LanguageSwitch = () => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("zh");
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const SwitchZh = () => {
    setCurrentLanguage("ZH");
    i18n.changeLanguage("zh");
    dispatch(setLanguage("zh-TW"));

    handleClose();
  };

  const SwitchEn = () => {
    setCurrentLanguage("EN");
    i18n.changeLanguage("en");
    dispatch(setLanguage("en-US"));

    handleClose();
  };

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="info"
        onClick={handleClick}
      >
        {currentLanguage}
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={SwitchZh}>
          <ListItemText primary={<Typography>中文</Typography>} />
        </MenuItem>
        <MenuItem onClick={SwitchEn}>
          <ListItemText primary={<Typography>English</Typography>} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitch;
