import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body
    const result = await AcademicSemesterService.createSemester(user)
    res.status(200).json({
      success: true,
      message: 'Academic Senester created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export const AcademicSemesterController = {
  createSemester,
}
