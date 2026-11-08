// using System;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using server.Data;
// namespace server.Controllers
// {
    

// [ApiController]
// [Route("api/[controller]")]
// public class NewsController
// (
//     AppDbContext _context
// ) : ControllerBase { 

//     [HttpGet]
//     public async Task<IActionResult> GetNews() { 
//         try { 
//             var result = await _context.News.ToListAsync(); 
//             return Ok( new { result });
//         } 
//         catch (Exception ex) { 
//             return BadRequest(new { Error = $"An Error Occured... Please Try again later... {ex.Message}"});
//         }
//     }    
//     [HttpGet("{id}")]
//     public async Task<IActionResult> GetNewsById(int id) { 
//         try { 
//             var result = await _context.News.FindAsync(id);
//             if(result == null) return NotFound(new { Message = "News is not found"});

//             return Ok(new { Message = $"Fetched news wih id {id}", result})
//         } catch (Exception ex) { 
//             Console.WriteLine($"An error ocured. See error details: {ex.Message}");
//             return BadRequest(new { Error = "An error occured try again later..."});
//         }
//     }
//     [HttpPost("create")]
//     public async Task<IActionResult> CreateNews([FromBody] News newsRequest) { 
//         try { 
//             var existing = await _context.News
//                 .Where(n => n.Subject == newsRequest.Headline);
//             if(existing is not null) return BadRequest(new { Error = "A news already exists. try again later"});

//             var result = await _context.News.AddAsync(newsRequest);
//             await _context.SaveChangesAsync();

//             return Ok(new { Message = "Message created successfully..."});
//         } catch(Exception ex) { 
//             Console.WriteLine($"An error occured when executing query... Please see the details: {ex.Message}");
//         }
//     }
//     [HttpPut("update/{id}")]
//     public async Task<IActionResult> UpdateNews([FromBody] News newsRequest, int id) { 
//         try { 
//             var existing = await _context.News.FindAsync(newsRequest.id);
//             if (existing == null) return NotFound(new { Message = "News cannot be found... Try again later..."});

//             existing.Headline = newsRequest.Headline;
//             existing.Body = newsRequest.Body;
//             existing.UpdatedAt = newsRequest.UpdatedAt;

//             await _context.SaveChangesAsync();

//             return Ok(new { 
//                 Message = "Update on News has been successul!"
//             });
//         } catch (Exception ex) { 
//             Console.WriteLine($"An Error occured while updating news... please see the details {ex.Message}");
//             return BadRequest(new { 
//                 Message = "An Error occured while updating news... Try again later..."
//             });
//         }
//     }
//     [HttpDelete("delete/{id}")]
//     public async Task<IActionResult> DeleteNews(int id) { 
//         try { 
//             var existing = _context.News.FindAsync(id);
//             if (existing == null) return NotFound(new  { 
//                 Message = "News Cannot be found..."
//             });
//             var result = await _context.Remove(existing);
//             await _context.SaveChangesAsync();

//             return Ok(new  { 
//                 Message = "Deletion successful!"
//             });
//         }catch (Exception ex) { 
//             Console.WriteLine($"An Error occured while updating news... please see the details {ex.Message}");
//             return BadRequest(new { 
//                 Message = "An Error occured while deleting news... Try again later..."
//             });
//         }
//     }
// }
// }