import styled from '@emotion/styled'

export const Title = styled.h1`
    font-size: 32px;
    line-height: 40px;
`

export const Logo = styled.img`
    width: 150px;

    @media (max-width: 768px) {
        width: 80px;
    }
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    padding: 30px 20px;
    min-height: 100%;
`

export const Form = styled.form`
    display: grid;
    grid-template-columns: 150px 100px 150px;
    gap: 20px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

export const Result = styled.div`
    display: flex;
    gap: 5px;
    font-size: 24px;
    line-height: 32px;
`