import React, { useEffect,useState } from "react";
import Banner from "../banner/Banner";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faHeartCircleCheck, faUsers } from "@fortawesome/free-solid-svg-icons";
import S from "./style";
import BannerMain from "../banner/BannerMain";
import { useSelector } from "react-redux";

const Main = () => {
    const isLogin = useSelector((state) => state.login.isLogin);
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
    
    const todayObject = {
        year: new Date().getFullYear(), //오늘 연도
        month: new Date().getMonth()+1,  //오늘 월
        date: new Date().getDate(), //오늘 날짜
        day: new Date().getDay(), //오늘 요일
    };

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = `${year}-${month}-${day}`;



    useEffect(() => {
        if (!isLogin) {
            navigate("/logIn");
        }
    }, [isLogin, navigate]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8000/myMind/getCalendar`,{
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                });
                if (!response.ok) {
                    throw new Error('데이터를 불러오는 데 실패했습니다.');
                }
                const datas = await response.json();
                
                if (Array.isArray(datas)) {
                    setData(datas);
                } else {
                    setData([]);
                }
                setCalendarData(datas);
            } catch (error) {
                console.error('데이터를 불러오는 중 에러 발생:', error);
            }
        }
        fetchData(); 
    },[])

    return (
        <>
            <S.Wrapper>
                {/* <Link to={"/myMind"}> */}
                    <S.BoxWritingMymind>
                        <S.Contents>
                            <div className="header">
                                <S.DateBox>
                                    <p>{todayDate}</p>
                                </S.DateBox>
                                <S.IconBox>
                                    {
                                        data.length === 0 ? (
                                            <FontAwesomeIcon icon={faUsers} />
                                        ):(
                                            data.map((item, i)=>{
                                                const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
                                                const formattedDate = `${todayObject.year}-${todayObject.month}-${todayObject.date}`;
                                                const hasData = calendarData.some(some => some.createdAt === formattedDate);
                                                if(hasData){
                                                        return <FontAwesomeIcon icon={faHeartCircleCheck} />    
                                                }else{
                                                   return <FontAwesomeIcon icon={faUsers} />
                                                }
                                            })
                                        )
                                    }
                                </S.IconBox>
                            </div>
                            <div className="body">
                                <S.DialogBox>
                                    {
                                        data.length === 0 ? (
                                            <div>
                                                <Link to={'/myMind'}>
                                                    <p>오늘 하루는 어떠셨나요?</p>
                                                    <p>오늘의 일지를 작성하러 가볼까요?</p>
                                                </Link>
                                            </div>
                                        ) : (
                                            data.map((item, i) => {
                                                const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
                                                const formattedDate = `${todayObject.year}-${todayObject.month}-${todayObject.date}`;
                                                const hasData = calendarData.some(some => some.createdAt === formattedDate);
                                                if (hasData) {
                                                    return (
                                                        <div key={i}>
                                                            <Link to={'/ourToday'}>
                                                                <p>오늘의 일지를 작성하셨네요!</p>
                                                                <p>우리의 오늘에서 사람들과 소통해볼까요?</p>
                                                            </Link>
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div key={i}>
                                                            <Link to={'/myMind'}>
                                                                <p>오늘 하루는 어떠셨나요?</p>
                                                                <p>오늘의 일지를 작성하러 가볼까요?</p>
                                                            </Link>
                                                        </div>
                                                    );
                                                }
                                            })
                                        )
                                    }
                                </S.DialogBox>
                            </div>
                        </S.Contents>
                    </S.BoxWritingMymind>
                {/* </Link> */}
            </S.Wrapper>
            <BannerMain />
            <S.Wrapper>
                <S.BoxForOurToday>
                    <div className="header">
                        <h4>우리의 오늘</h4>
                        <Link to={"/ourToday"}>
                            <p>
                                모두보기
                                <FontAwesomeIcon icon={faAngleRight} />
                            </p>
                        </Link>
                    </div>
                    <div className="body"></div>
                </S.BoxForOurToday>
            </S.Wrapper>
        </>
    );
};

export default Main;
