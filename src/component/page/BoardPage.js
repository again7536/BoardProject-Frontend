import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import "../../style/AlignmentCenter.css"

export default function BoardPage() {
    const { boardId } = useParams();
    const [board, setBoard] = useState();
    const [replyList, setReplyList] = useState([]);
    const [loadData, isLoadData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getBoard();
        // getBoardLike();
        getReply();
        // getReplyLike();
    }, [])

    function getBoard() {
        axios.get(process.env.REACT_APP_SERVER_HOST + "/board/" + boardId)
            .then(res => {
                isLoadData(true)
                setBoard(res.data)
                console.log(res.data)
            })
            .catch(() => {
                isLoadData(false)
                console.log("게시글 실패")
            })
    }

    function getReply() {
        axios.get(process.env.REACT_APP_SERVER_HOST + "/reply/" + boardId)
            .then(res => {
                setReplyList(res.data)
                console.log(res.data)
            })
            .catch(() => {
                console.log("댓글 실패")
            })
    }

    if (loadData === null) {
        return (
            <Card body className="alignmentCenter normalPadding shadow">데이터 요청중...</Card>
        )
    }
    if (!loadData) {
        return (
            <Card body className="alignmentCenter normalPadding shadow">데이터를 가져오지 못했습니다.</Card>
        )
    }
    return (
        <div style={{ padding: '50px 200px 50px 200px' }}>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title as={"h1"}>{board.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <div style={{ float: "left" }}>{board.nickname}</div>
                        <div style={{ float: "right" }}>조회수: {board.hit}</div>
                    </Card.Subtitle>
                    <br />
                    <hr />
                    <Card.Text style={{ padding: "50px 0px 50px 0px" }}>
                        {board.content}
                    </Card.Text>
                    <div style={{ textAlign: "center" }}>
                        <Button>👍{board.like}</Button>
                    </div>
                    <div>댓글</div>
                    {replyList.map((reply, index) => (
                        <div key={index}>
                            <hr />
                            {/* <p>{reply.nickname}</p> */}
                            {reply.content}
                            <Button>👍{board.like}</Button>
                        </div>
                    ))}
                    <InputGroup className="mb-3" style={{ paddingTop: "20px" }}>
                        <Form.Control
                            placeholder="댓글을 작성해주세요."
                            aria-label="댓글을 작성해주세요."
                            aria-describedby="basic-addon2"
                            style={{ height: '100px' }}
                        />
                        <Button variant="primary" id="button-addon2">
                            댓글 작성
                        </Button>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={(e) => { navigate('/board') }}>게시판으로</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}