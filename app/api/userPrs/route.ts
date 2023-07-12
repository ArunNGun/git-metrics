//@ts-ignore
import fetchUserPulls from '../../services/fetchUserPulls'
import {processUserPRs} from '../../helpers/usersHelper'
const { Octokit } = require('@octokit/core')

export async function GET(req: Request){
    try {
        const octokit = new Octokit({ auth: process.env.GIT_TOKEN })
        const url = new URL(req.url);
        const gitUser = url.searchParams.get('gitUser');
        const fromDate = url.searchParams.get('fromDate');
        const toDate = url.searchParams.get('toDate');
      const data = await fetchUserPulls({
        startDate: fromDate,
        endDate: toDate,
        user: gitUser,
        octokit
      })
      const { prRaised, prReviewed } = data
      const processedUserPRs = processUserPRs(prRaised, prReviewed)
      return new Response(JSON.stringify(processedUserPRs))
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify(e))
      }
  
  }
 