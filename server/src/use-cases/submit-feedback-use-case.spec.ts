import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sandMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sandMailSpy },
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,8743df4fs8df'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sandMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,8743df4fs8df'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,8743df4fs8df'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback with an invalid sreenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.png'
    })).rejects.toThrow()
  })
})