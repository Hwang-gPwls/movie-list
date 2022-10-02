import styled from "styled-components";

interface IModlaProp {
  isBookmark: boolean;
  handleBookmark: (isBookmark: boolean) => void;
  setModalOpen: (isOpen: boolean) => void;
}

const Modal = ({ isBookmark, handleBookmark, setModalOpen }: IModlaProp) => {
  const message = isBookmark ? "즐겨찾기 제거" : "즐겨찾기";

  const closeModal = () => {
    setModalOpen(false);
  };

  const bookmarkClickHandler = () => {
    handleBookmark(!isBookmark);

    closeModal();
  };

  return (
    <Container>
      <p className="message">{`${message} 하시겠습니까?`}</p>
      <div className="btn-group">
        <button className="btn-group_button" onClick={bookmarkClickHandler}>
          {message}
        </button>
        <button className="btn-group_button" onClick={closeModal}>
          취소
        </button>
      </div>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  width: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 3rem;
  border: 3px solid ${({ theme }) => theme.color.black};
  border-radius: 5px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);

  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;

    &_button {
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      background: ${({ theme }) => theme.color.white};
      padding: 0.3rem 3.4rem;
      border: 3px solid ${({ theme }) => theme.color.black};
      margin-right: 2.6rem;
      box-shadow: 0 0 0 ${({ theme }) => theme.color.black};
      transition: all 0.2s;

      &:last-child {
        margin: 0;
      }

      &:hover {
        box-shadow: 0.4rem 0.4rem 0 ${({ theme }) => theme.color.black};
        transform: translate(-0.4rem, -0.4rem);
      }

      &:active {
        box-shadow: 0 0 0 ${({ theme }) => theme.color.black};
        transform: translate(0, 0);
      }
    }
  }
`;
