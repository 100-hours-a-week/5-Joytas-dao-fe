import {
  DeleteModalContainer,
  DeleteModalContents,
  DeleteModalTitle,
  LoungeListModalContainer,
  LoungeListModalContents,
  LoungeListModalTitle,
  MenuModalContainer,
  ModalButton,
  ModalButtonContainer,
} from './ModalStyles'

interface MenuProps {
  onClickUpdate: () => void
  onClickDelete: () => void
}

interface DeleteProps {
  onClose: () => void
  handleDelete: () => void
  isClick?: boolean
}

interface LoungeListProps {
  onClose: () => void
}

export function MenuModal({ onClickUpdate, onClickDelete }: MenuProps) {
  return (
    <MenuModalContainer>
      <div onClick={onClickUpdate}>수정하기</div>
      <div onClick={onClickDelete}>삭제하기</div>
    </MenuModalContainer>
  )
}

export function DeleteModal({ onClose, handleDelete }: DeleteProps) {
  return (
    <DeleteModalContainer>
      <DeleteModalTitle>정말 삭제하시겠습니까?</DeleteModalTitle>
      <DeleteModalContents>
        <span>
          한 번 삭제한 오브제는 <br /> 복구할 수 없습니다.
        </span>
        <ModalButtonContainer>
          <ModalButton className='cancel' onClick={onClose}>
            취소
          </ModalButton>
          <ModalButton className='confirm' onClick={handleDelete}>
            확인
          </ModalButton>
        </ModalButtonContainer>
      </DeleteModalContents>
    </DeleteModalContainer>
  )
}

export function DeleteUserModal({
  isClick,
  onClose,
  handleDelete,
}: DeleteProps) {
  return (
    <DeleteModalContainer>
      <DeleteModalTitle>정말 탈퇴하시겠습니까?</DeleteModalTitle>
      <DeleteModalContents>
        <span style={{ fontSize: '10px', lineHeight: '1.2' }}>
          *회원이 작성한 컨텐츠는 자동적으로 삭제되지 않으며, <br /> 만일 삭제를
          원하시면 탈퇴 이전에 삭제가 필요합니다. <br /> 탈퇴 후 동일한 아이디로
          재가입이 어렵습니다. <br />
          회원탈퇴를 하시면 위 내용에 동의하는 것으로 간주됩니다.
        </span>
        <ModalButtonContainer>
          <ModalButton className='cancel' onClick={onClose}>
            취소
          </ModalButton>
          <ModalButton
            disabled={isClick}
            className='confirm'
            onClick={handleDelete}
          >
            확인
          </ModalButton>
        </ModalButtonContainer>
      </DeleteModalContents>
    </DeleteModalContainer>
  )
}

export function LoungeListModal({ onClose }: LoungeListProps) {
  return (
    <LoungeListModalContainer>
      <LoungeListModalTitle>라운지 목록</LoungeListModalTitle>
      <LoungeListModalContents>
        <div>라운지1</div>
        <div>라운지2</div>
        <div>라운지3</div>
        <div>라운지4</div>
        <div>라운지5</div>
      </LoungeListModalContents>
      <ModalButtonContainer>
        <ModalButton className='cancel' onClick={onClose}>
          취소
        </ModalButton>
        <ModalButton className='confirm' onClick={onClose}>
          선택
        </ModalButton>
      </ModalButtonContainer>
    </LoungeListModalContainer>
  )
}
