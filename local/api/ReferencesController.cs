using DotNetNuke.Security;
using DotNetNuke.Web.Api;
using System.Web.Http;
using ToSic.SexyContent.WebApi;
using System.Linq;

public class ReferencesController : SxcApiController
{
  [HttpGet]
  [AllowAnonymous]
	[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Anonymous)]
  public dynamic GetImages(int entityId)
  {
    var reference = App.Data["Reference"].List
      .Where(r => r.EntityId == entityId)
      .FirstOrDefault();

    return AsAdam(reference, "Images").Files;
  }
}
