using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Talent.Services.Profile.Models
{
    /// <summary>
    /// these class models are for recruiter to suggest talent to companys
    /// </summary>
    public class AddTalentSuggestion
    {
        public string TalentId { get; set; }
        public string Notes { get; set; }
        public string Comments { get; set; }
    }
    public class AddTalentSuggestionList
    {
        public string EmployerOrJobId { get; set; }
        public List<AddTalentSuggestion> SelectedTalents { get; set; }
        public bool ForJob { get; set; }
    }
}
