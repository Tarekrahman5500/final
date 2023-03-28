import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {InputBase, styled} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, logout} from "../../../actions/userAction.js";
import {parse, stringify, toJSON, fromJSON} from 'flatted';

const pages = ['Products', 'Pricing', 'Blog'];
let settings = ['Login'];


const Search = styled('div')(({theme}) => ({
    backgroundColor: 'white',
    width: '40%',
    borderRadius: theme.shape.borderRadius,
}))

const Header = () => {

      const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector(state => state.user);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            stringify(settings.splice(0, 1))
            if (user.role === 'admin') {
                stringify(settings.push('DashBoard', 'Profile', 'Logout'))
            } else {
                stringify(settings.push('Orders', 'Profile', 'Logout'))

                //  stringify(settings.splice(3, 3, "Logout"))
            }
            // stringify(settings.push('Profile', "Logout"))
        }
         return () => {
            settings = ['Login'];
         }

    }, [isAuthenticated])


    const handleOpenNavMenu = (event) => {
        //   console.log(event.target.id)
        // event.preventDefault();
        setAnchorElNav(event.currentTarget);

    };
    const handleOpenUserMenu = (event) => {
        // console.log(event.target.id)
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        navigate(event.currentTarget.id)
        //   console.log(event.currentTarget.id)
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (event) => {
      //  console.log(event)
        // navigate(event)
         if (event === 'Logout') {
         //   console.log('here')
            dispatch(logout())
            navigate('/login')
        } else if (typeof  event === 'string') {
            navigate(`${event.toLowerCase()}`)
        }
        setAnchorElUser(null);
    };
    const searchSubmitHandler = event => {
        event.preventDefault();
        if (event.target.value.trim()) navigate(`/products/${event.target.value}`)
        else toast.error(`${event.target.value} not found`)
    }

    const goHome = (event) => {

        event.preventDefault();
        navigate('/home')
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"

                        onClick={goHome}
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Ecommerce
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} id={page}>
                                    <Typography data={page} textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Search><InputBase placeholder='Search' onBlur={searchSubmitHandler}/></Search>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                id={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)} value={setting}>
                                    {<Typography style={{textDecoration: 'none', color: 'black'}}
                                                 textAlign="center">{setting}</Typography>
                                    }

                                </MenuItem>
                            ))}
                            {/* <MenuItem>
                                <Link to="/account"><Typography textAlign="center">Account</Typography></Link>
                            </MenuItem>*/}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );

};


export default Header;