import React, {useState} from "react";
import styles from './login.module.css';
import axios from "axios";
import  {useNavigate, useParams} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../redux/slices/authSlice';

 function Login(props) {
     const dispatch = useDispatch();
     const token = useSelector((state) => state.auth.token);

     const navigate = useNavigate();
     const [formData, setFormData] = useState({
        id: '',
        password: ''

    })
    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        console.log(formData)
    }

    const loginFunction =  ()=>{
        axios.post(`${process.env.REACT_APP_USER_URL}/login`, JSON.stringify(formData),{
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(res=>{
                console.log('데이터 전송 성공:', res);
                // console.log(props.setIsLoggedIn(res.data));
                if(res.data) {
                    const receivedToken = res.data; // 서버에서 받은 토큰
                    dispatch(setToken(receivedToken));
                    setTimeout(()=>{
                        console.log(token)
                    },0);

                    // props.setIsLoggedIn(true);
                    // props.setLoginId(formData.id);
                    // props.setToken(res.data)
                    // navigate("/home");
                    // console.log('데이터 전송 성공:', res);
                }else{
                    alert("아이디를 다시 입력해 주세요 ")
                    setFormData(formData => ({ ...formData, id: '', password: '' }));
                    console.log(formData)
                }


                //
        })
            .catch(error=>{
                console.error('데이터 전송실패:',error);
            })
    }

    const logout = () => {
        // dispatch(clearToken());
        setTimeout(()=>{
            console.log(token)
        },0);
     }
     // function YourComponent() {
     //     const token = useSelector((state) => state.auth.token);
     //
     //     const fetchData = async () => {
     //         try {
     //             const response = await axios.get('your-api-endpoint', {
     //                 headers: {
     //                     'Authorization': `Bearer ${token}`
     //                 }
     //             });
     //             // 응답 처리
     //         } catch (error) {
     //             // 에러 처리
     //         }
     //     };
     //
     //     // ...
     // }


    return (
        <div className="main-page-content">
            <div id="skill" >
                <div className="skill-main">

                    {/* <!-- ================================ 배너 =============================== --> */}

                </div>

            </div>
            <div id="about">
                <div className="about-content">
                    <div className="love-grid text-center">
                        <div className="container">
                            <div className="row" style={{display:'inline-block'}}>
                                <div className="col-md-12" style={{textAlign:'center'}}>
                                    <div className="main-title text-center wow fadeIn" >
                   {/* <!-- ================================ LOGIN =============================== --> */}
                                        <div className="login-wrapper" style={{textAlign:'center'}}>
                                            <div className="login-content" style={{width:'100%'}}>
                                                <h2 className="login-title" style={{fontSize:'3em'}}>Log In </h2>
                                                <form className="login-form validated-form" id="login-form"
                                                      name="login-form" method="post"
                                                      >
                                                    <div className="login-input-wrapper" style={{margin:'20px', font:'inherit'}}>
                                                        <input className="login-email" id="id" name={'id'} type="text"
                                                               onChange={handleChange}
                                                               placeholder="id" minLength="0"
                                                               data-msg-required="This field is required"
                                                               data-msg-minlength="Please enter at least  characters"
                                                               required style={{width:'100%',
                                                            height:'50px',lineHeight:'50px',border:0,
                                                            fontSize:'20px', fontWeight:'700', borderBottom:'2px solid #d4d0c7',
                                                            transition:' border .15s ease'}} value={formData.id}/>
                                                    </div>
                                                    <div className="login-input-wrapper" style={{margin:'20px', font:'inherit'}}>
                                                        <input className="login-password" id="password" name={'password'}
                                                               onChange={handleChange}
                                                               type="password"
                                                               placeholder="Password" minLength="6"
                                                               data-msg-required="This field is required"
                                                               data-msg-minlength="Please enter at least 6 characters"
                                                               required style={{width:'100%',
                                                            height:'50px',lineHeight:'50px',border:0,
                                                            fontSize:'20px', fontWeight:'700', borderBottom:'2px solid #d4d0c7',
                                                            transition:' border .15s ease'}} value={formData.password}/>
                                                    </div>

                                                    <button type="button" className={styles.loginBtn} onClick={loginFunction}>Log In</button>
                                                    <button type='button' className={styles.loginBtn} onClick={logout}>Log Out</button>

                                                    <a className="login-link" href="forgot-password.php">Forgot
                                                        password?         </a>   /
                                                    <a className="login-link" href="/signup">         Sign Up</a>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div id="skill">
                <div className="skill-main">

                    {/* <!-- ================================ 배너 =============================== --> */}

                </div>

            </div>


            {/* <!-- ================================ ABOUT =============================== --> */}


        </div>
    )
}

export default Login;