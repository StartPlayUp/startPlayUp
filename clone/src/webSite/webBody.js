import webList from "./webList";

function webBody() {
    return (
        <div id="body">
            <div id={"body-center"}>
                <div id = "button-area">
                    <button>
                        Create Room
                    </button>
                </div>
                <div id="room-list">
                     <div className="list">
                         <span>방 번호</span>
                         <span className="title">방 제목</span>
                         <span>사용자 </span>
                         <span>인원 수</span>
                     </div>
                    <hr/>
                     <div className="list">
                         <span>방 번호</span>
                         <span className="title">방 제목</span>
                         <span>사용자 </span>
                         <span>인원 수</span>
                     </div>
                </div>
            </div>
            <div id="footer-area">
                <h1>footer-area</h1>
                <div id="footer-center">
                    footer-center
                </div>
            </div>
        </div>
    );
}

export default webBody;