import React, { useState, useEffect } from "react"
import { Card, Row, Col } from "react-bootstrap"

export default function Dashboard() {
    const char = ['', '一', '二', '三', '四', '五', '六', '日'];
    const [icons, seticons] = useState('');
    const [temperature, settemperature] = useState('');
    const [humidity, sethumidity] = useState('');
    const [warningMessage, setwarningMessage] = useState('');
    const [r_updateTime, setRupdateTime] = useState('');
    const [forecastDesc, setforecastDesc] = useState('');
    const [f_updateTime, setFupdateTime] = useState('');
    const [generalSituation, setgeneralSituation] = useState('');
    const [g_updateTime, setGupdateTime] = useState('');

    useEffect(() => {
        fetch_rhrread();
        fetch_flw();
        fetch_fnd();
    }, []);

    function fetch_rhrread() {
        var rhrread_icons = [];
        const API_Call = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc`;
        fetch(API_Call)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                // console.log(data);
                const dataicons = data['icon']
                dataicons.map((icon) => { rhrread_icons.push(`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${icon}.png`); })
                seticons(rhrread_icons);
                settemperature(`${data['temperature']['data'][0]['value']}°C`);
                sethumidity(`${data['humidity']['data'][0]['value']}%`);
                setwarningMessage(data['warningMessage']);
                const updateTimeDate = new Date(data['updateTime']);
                const month = updateTimeDate.getMonth()
                const date = updateTimeDate.getDate()
                const day = char[updateTimeDate.getDay()]
                const time = updateTimeDate.toLocaleTimeString()
                const updateTimeString = `${month}月${date}日 (星期${day}) ${time}`
                setRupdateTime(updateTimeString);
            })
    }

    function fetch_fnd() {
        const API_Call = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc`;
        fetch(API_Call)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                // console.log(data);
                setgeneralSituation(data['generalSituation']);
                const updateTimeDate = new Date(data['updateTime']);
                const month = updateTimeDate.getMonth()
                const date = updateTimeDate.getDate()
                const day = char[updateTimeDate.getDay()]
                const time = updateTimeDate.toLocaleTimeString()
                const updateTimeString = `${month}月${date}日 (星期${day}) ${time}`
                setGupdateTime(updateTimeString);
            })
    }

    function fetch_flw() {
        const API_Call = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc`;
        fetch(API_Call)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                // console.log(data);
                setforecastDesc(data['forecastDesc']);
                const updateTimeDate = new Date(data['updateTime']);
                const month = updateTimeDate.getMonth()
                const date = updateTimeDate.getDate()
                const day = char[updateTimeDate.getDay()]
                const time = updateTimeDate.toLocaleTimeString()
                const updateTimeString = `${month}月${date}日 (星期${day}) ${time}`
                setFupdateTime(updateTimeString);
            })
    }

    return (
        <>
            <div>
                <main>
                    <Row>
                        <Col>
                            <Card className="p-4 mt-5">
                                <Card.Title>現時天氣 {r_updateTime}</Card.Title>
                                <Card.Body>
                                    <h2>
                                        <span>
                                            {icons && icons.map((icon, i) => (
                                                <img key={i} src={icon} />
                                            ))}
                                        </span>
                                        <span>{temperature}</span>
                                        <span>{humidity}</span>
                                    </h2>
                                    <p>{warningMessage}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Card className="p-4 mt-5">
                                <Card.Title>天氣概況 {g_updateTime}</Card.Title>
                                <Card.Body>
                                    <p>{generalSituation}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <Card className="p-4 mt-5">
                                <Card.Title>天氣預測 {f_updateTime}</Card.Title>
                                <Card.Body>
                                    <p>{forecastDesc}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>


                </main>
            </div>
        </>
    )
}