//@ts-ignore
export const dynamic='force-dynamic';

import fetchPulls from '../../services/fetchPulls'
import {processPullRequests} from '../../helpers/pullRequestsHelper'
const { Octokit } = require('@octokit/core')

export async function GET(req: any){
        try {
            const octokit = new Octokit({ auth: process.env.GIT_TOKEN })  
            const {searchParams} = new URL(req.url);
            const repoName = searchParams.get('repoName');
            const fromDate = searchParams.get('fromDate');
            const toDate = searchParams.get('toDate');
            const data = await fetchPulls({
              repoName: `adobe/${repoName}`,
              startDate: fromDate,
              endDate: toDate,
              appOctokit: octokit
            })
            const result = data.search.edges
            // console.log(JSON.stringify(result))
            const processedPullRequests = processPullRequests(result)
        return new Response(JSON.stringify(processedPullRequests))
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify([]))
      }
  
  }
 