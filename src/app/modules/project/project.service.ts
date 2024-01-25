import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { TProject } from './project.interface';
import { Project } from './project.model';

const createProjectIntoDB = async (payload: TProject) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const project = await Project.create([payload], { session });
    // update user projects[],
    const updatedUser = await User.findByIdAndUpdate(
      project[0].admin,
      {
        $push: { projects: project[0]?._id },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    await session.commitTransaction();
    await session.endSession();
    return { project: project[0], updatedUser };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateProjectIntoDB = async (id: string, payload: Partial<TProject>) => {
  const result = await Project.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getUserAllProjectFromDB = async (id: string) => {
  const user = await User.isUserExists({_id: id});
  const projects = await Project.find({ _id: { $in: user?.projects } });
  return projects;
};

export const ProjectServices = {
  createProjectIntoDB,
  updateProjectIntoDB,
  getUserAllProjectFromDB,
};
